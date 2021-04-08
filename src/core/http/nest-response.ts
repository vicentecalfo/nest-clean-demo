export class NestResponse {
  status: number;
  headers: Record<string, any>;
  body: Record<string, any>;

  constructor(response: NestResponse) {
    Object.assign(this, response);
  }
}
