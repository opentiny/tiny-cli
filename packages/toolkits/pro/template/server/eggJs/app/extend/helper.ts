import { Op } from 'sequelize';
import BaseUtils from '../utils/base-utils';

const DEFAULT_SORT_FIELD = 'create_time';
const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

export default {
  exceptionHandling(ctx, error, message = '') {
    const errMsg = BaseUtils.getErrorMessage(error);

    if (message) {
      ctx.logger.error(message, errMsg);
    } else {
      ctx.logger.error(errMsg);
    }
  },

  commonJson(
    ctx,
    data?: Record<string, any>,
    httpStatus?: number,
    errCode?: string,
    errMsg?: string,
  ) {
    const responseBody = {
      code: errCode ? errCode : '0',
      errMsg: errMsg || (errCode ? ctx.__(errCode) : ''),
      data: data ? data : {},
    };
    ctx.status = httpStatus ? httpStatus : 200;
    ctx.body = responseBody;
  },

  getPagination(pageIndex: string = '1', pageSize: string = '20') {
    let no = Number(pageIndex);
    let size = Number(pageSize);
    no = isNaN(no) || no < 1 ? 1 : no;
    size = isNaN(size) || size < 0 ? 20 : size;
    return [ (no - 1) * size, size ];
  },

  getSortFieldAndType(sortField: string, sortType: string = 'desc') {
    return [ (sortField || DEFAULT_SORT_FIELD), (sortType === SORT_ASC)? SORT_ASC : SORT_DESC ];
  },

  getWhere(searchInfo: { [prop: string]: string } = {}) {
    const where = {};

    Object.keys(searchInfo).map(key => {
      const value = searchInfo[key];

      where[key] = {
        [Op.like]: `%${value}%`,
      }
    })

    return where;
  }
};
