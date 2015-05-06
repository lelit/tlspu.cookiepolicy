var CookiePolicy = {};

CookiePolicy.toggleCookiePolicy = function toggleCookiePolicy() {
    jQuery("#viewlet-cookiepolicy").slideToggle(500);
}

CookiePolicy.acceptCookiePolicy = function acceptCookiePolicy() {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1)
    var expires = "; expires="+date.toGMTString();
    document.cookie = "cookie-policy=accepted"+expires+"; path=/";
    CookiePolicy.toggleCookiePolicy();
}

CookiePolicy.confirmAcceptCookiePolicy = function confirmAcceptCookiePolicy() {
    if (document.getElementById("cookie-agreed").checked) {
        acceptCookiePolicy();
    } else {
        // This should never happen unless users are removing the disabled flag themselves.
        window.alert("You must confirm that you have read and understood this message before dismissing it.");
    }
}

CookiePolicy.deleteCookies = function delete_cookies(domain) {
    var cookie_domain = domain || window.location.hostname;
    cookie_domain = cookie_domain.indexOf('www') === 0 ? cookie_domain.substr(3) : cookie_domain;
    var cookies = document.cookie.split(";");
    var i, cookie, key, cookie_length;
    for (i = 0, cookie_length = cookies.length; i < cookie_length; i += 1) {
        cookie = cookies[i];
        key = cookie.indexOf("=");
        var name = key > -1 ? cookie.substr(0, key) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT" +
            ";domain=" + cookie_domain + ";path=/";
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT" +
            ";path=/";
    }
};

jQuery(function() {
    var btn = document.getElementById("tlspu_cookiepolicy_button");
    var chk = document.getElementById("tlspu_cookiepolicy_agreed");

    if (btn === null) {
        return;
    }

    btn.onclick = function(evt) {
        CookiePolicy.acceptCookiePolicy();
        evt.preventDefault();
    };

    chk.onclick = function() {
        if (chk.checked) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
        }
    };

    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf("cookie-policy=") === 0) {
            CookiePolicy.acceptCookiePolicy();
            return;
        }
    }
    setTimeout(CookiePolicy.toggleCookiePolicy, 1000);
});
