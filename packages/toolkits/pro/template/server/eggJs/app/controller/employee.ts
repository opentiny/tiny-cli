import { Controller } from 'egg';

export default class EmployeeController extends Controller {
  public async getEmployee() {
    const { ctx } = this;
    const payload = ctx.request.body || {};
    const { pageIndex = 1, pageSize = 20, searchInfo = {} } = payload;
    const [offset, limit] = ctx.helper.getPagination(pageIndex, pageSize);

    try {
      const where = ctx.helper.getWhere(searchInfo);
      let { sortField, sortType } = payload;

      [sortField, sortType] = ctx.helper.getSortFieldAndType(sortField, sortType);
      const options = {
        where,
        limit,
        offset,
        order: [[sortField, sortType]],
        raw: true,
      };

      this.logger.info('[ controller | employee ] getEmployee : 进入getEmployee方法');
      const result = await ctx.service.employee.getEmployee(options);
      ctx.helper.commonJson(
        ctx,
        {
          data: result.rows,
          total: result.count,
        },
        200,
      );
    } catch (error) {
      ctx.helper.commonJson(ctx, {}, 500, 'InternalError');
    }
  }
}
