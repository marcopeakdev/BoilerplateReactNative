type TypesBase =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined';

export const onShowErrorBase = (msg: string) => {
  // eslint-disable-next-line no-alert
  alert(msg);
};
export const onCheckType = (source: any, type: TypesBase) => {
  return typeof source === type;
};
