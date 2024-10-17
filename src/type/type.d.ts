type TMenuItem = {
  url: string;
  title: string;
  icon?: React.ReactNode;
};
type ActiveLinkProps ={
    url: string,
    children: React.ReactNode,
}
export { TMenuItem ,ActiveLinkProps};
