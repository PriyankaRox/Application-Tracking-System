import _ from 'lodash';

export function paginate (items,pageNo,pagesize){

    const startIndex = (pageNo-1)*pagesize;

      return  _(items)
        .slice(startIndex)
        .take(pagesize)
        .value()
}