/* eslint-disable prettier/prettier */
export class ColumnDecimalTransformer {
    to(value: number): number {
      return value;
    }
    from(value: string): number {
      return parseFloat(value);
    }
  }