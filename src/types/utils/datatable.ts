export class col {
  label?: string;
  fieldName: string='';
  type: supportedTypes=stypes.text;
  hideLabel?: boolean;
  sortable?: boolean;

  get tojson() { return JSON.stringify(this) }
  get _type() { return <string> this.type}
}
 enum supportedTypes{
  text="text",
  password="password",
  email="email",
  url="url",
  tel="tel",
  date="date",
  number="number",
  button="button"
}
export const stypes=supportedTypes
