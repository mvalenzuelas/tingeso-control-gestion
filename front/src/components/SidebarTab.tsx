import { ReactNode } from "react";

interface SidebarTabProps {
  children: ReactNode;
  tabName: string;
}

const SidebarTab = ({ tabName, children }: SidebarTabProps) => {
  return (<>
      <p className="uppercase mb-3 font-medium">{ tabName }</p>
      <ul className="ml-1 flex flex-col gap-0.5 tracking-tight">
        { children }
      </ul>
    </>
  )
};

export default SidebarTab;
