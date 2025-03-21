import Sidebar from "@/components/backoffice/Sidebar";

const BackOfficeLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
};

export default BackOfficeLayout;
