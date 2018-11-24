
/**
 * 获取失败返回的错误信息
 */
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }
}

/**
 * 获取成功返回的成功信息
 */
function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch(e) {
    return text;
  }
}

/**
 * @param option 上传要带的参数 包括url file相关信息
 */
export default function upload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }
  
  const xhr = new XMLHttpRequest();
  // action 接口请求的地址
  const action = option.action;
  
  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.precent = e.loaded / e.total * 100;
      }
      // 返回结果给option的 进度函数参数
      option.onProgress(e);
    };
  }

  // 创建一个formdata 序列化传
  const formdata = new FormData();
  // 上传是附带的额外参数
  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formdata.append(key, option.data[key]);
    });
  }
  
  console.log(option);

  formdata.append(option.filename, option.file, option.file.name);

  // 获取失败
  xhr.onerror = function(e) {
    option.onError(e);
  };

  // 获取成功
  xhr.onload = function() {
    // 图片上传成功的状态码都在 200~300
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    // 成功则返回 body信息
    option.onSuccess(getBody(xhr));
  };

  xhr.send(formdata);

  // 处理跨越的时候支持cookie凭证 如果传了这个参数为真 且 xhr支持该属性
  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.header || {};
  // 设置上传请求的头部信息
  for (let item in headers) {
    // 自有属性且不是null
    if (headers.hasOwnProperty(item) && headers[item] !== null ) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
}


