import { Controller } from 'egg';

export default class EmployeeController extends Controller {
  public async index() {
    const { ctx } = this;

    ctx.helper.commonJson(
      ctx,
      {
        data: {}
      },
      200,
    );
  }
}
