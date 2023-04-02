class Response<T> {
  private readonly success: boolean;
  private readonly message: string | T;
  private readonly data?: T;

  constructor(success: boolean, message: string | T, data?: T) {
    this.success = success;
    this.message = message;
    if (data) this.data = data;
  }
}

/**
 * @description 錯誤回傳時使用
 */
export class ResponseError<T> extends Response<T> {
  constructor(message: string | T) {
    super(false, message);
  }
}

/**
 * @description 回傳檔案時使用
 */
export class ResponseData<T> extends Response<T> {
  constructor(data: T, message = '') {
    super(true, message, data);
  }
}

/**
 * @description 成功時時使用 無檔案
 */
export class ResponseSuccess extends Response<null> {
  constructor(message: string) {
    super(true, message);
  }
}
