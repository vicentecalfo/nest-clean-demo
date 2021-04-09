import { NestResponse } from './nest-response';

export class NestResponseBuilder {
  private response: NestResponse = {
    status: 200,
    headers: {},
    body: {},
  };

  public status(status: number) {
    this.response.status = status;
    return this;
  }

  public headers(headers: Record<string, string>) {
    this.response.headers = headers;
    return this;
  }

  public body(body: Record<string, any>) {
    this.response.body = body;
    return this;
  }

  public build() {
    return new NestResponse(this.response);
  }
}
