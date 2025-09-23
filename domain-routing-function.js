function handler(event) {
    var request = event.request;
    var uri = request.uri;
    var host = request.headers.host.value;

    // Domain-based routing
    if (host === 'moneyone.in' || host === 'www.moneyone.in') {
        // For moneyone.in, always serve moneyone content
        if (uri === '/' || uri === '') {
            request.uri = '/moneyone/index.html';
        } else if (uri.startsWith('/moneyone/')) {
            // Keep moneyone paths as-is
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        } else if (uri.startsWith('/_next/') || uri.startsWith('/favicon.ico') || uri.startsWith('/icon.') || uri.includes('.')) {
            // Keep static assets (CSS, JS, images, etc.) at root level
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        } else {
            // Redirect other paths to moneyone
            request.uri = '/moneyone' + uri;
            if (request.uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!request.uri.includes('.')) {
                request.uri += '/index.html';
            }
        }-    } else if (host === 'onemoney.moneyone.in' || host === 'www.onemoney.moneyone.in') {
        // For onemoney.moneyone.in, always serve onemoney content
        if (uri === '/' || uri === '') {
            request.uri = '/onemoney/index.html';
        } else if (uri.startsWith('/onemoney/')) {
            // Keep onemoney paths as-is
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        } else if (uri.startsWith('/_next/') || uri.startsWith('/favicon.ico') || uri.startsWith('/icon.') || uri.includes('.')) {
            // Keep static assets (CSS, JS, images, etc.) at root level
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        } else {
            // Redirect other paths to onemoney
            request.uri = '/onemoney' + uri;
            if (uri.endsWith('/')) {
                request.uri += 'index.html';
            } else if (!uri.includes('.')) {
                request.uri += '/index.html';
            }
        }
    } else if (host === 'equal.moneyone.in' || host === 'www.equal.moneyone.in') {
        // For equal.moneyone.in, serve root content (default behavior)
        if (uri.endsWith('/')) {
            request.uri += 'index.html';
        } else if (!uri.includes('.')) {
            request.uri += '/index.html';
        }
    } else {
        // Default behavior for other domains (CloudFront domain)
        if (uri.endsWith('/')) {
            request.uri += 'index.html';
        } else if (!uri.includes('.')) {
            request.uri += '/index.html';
        }
    }

    return request;
}
