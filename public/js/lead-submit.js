(function () {
  var FALLBACK = "Something went wrong. Please call (818) 584-7389 or email us and we'll take it from here.";

  window.doqShowLeadError = function (anchorId, message) {
    var anchor = document.getElementById(anchorId);
    if (!anchor) {
      window.alert(message);
      return;
    }
    var el = document.getElementById(anchorId + '-error');
    if (!el) {
      el = document.createElement('p');
      el.id = anchorId + '-error';
      el.setAttribute('role', 'alert');
      el.style.cssText = 'color:#b91c1c;margin-top:12px;font-size:14px;text-align:center;';
      anchor.appendChild(el);
    }
    el.textContent = message || FALLBACK;
    el.style.display = 'block';
  };

  window.doqSubmitLead = function (payload) {
    var body = payload || {};
    if (!body.page) body.page = window.location.pathname;
    return fetch('/api/quote/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok || !data.success) {
          throw new Error(data.error || FALLBACK);
        }
        return data;
      });
    }).catch(function (err) {
      if (err && err.message && err.message !== 'Failed to fetch') throw err;
      throw new Error(FALLBACK);
    });
  };
})();
