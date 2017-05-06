function request(url, type, body, headers) {
    var promise = new Promise((resolve, reject) => $.ajax({
        url: url,
        method: type,
        data: body,
        headers: headers,
        contentType: 'application/json',
        success: resolve,
        error: reject
    }
    ));
    return promise;
}

export function get(url, headers = {}) {
    return request(url, "GET", "", headers);
}

export function post(url, body, headers = {}) {
    return request(url, 'POST', JSON.stringify(body), headers);
}

export function put(url, body, headers = {}) {
    return request(url, 'PUT', JSON.stringify(body), headers);
}

export function del(url, body, headers = {}) {
    return request(url, "DELETE", body = {}, headers = {});
}

//if it fails, remove all headers