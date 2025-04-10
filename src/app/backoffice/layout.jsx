import Sidebar from "@/components/backoffice/Sidebar";

const BackOfficeLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
        {" "}
        {/* Ajout de overflow-y-auto */}
        {children}
      </main>
    </div>
  );
};

export default BackOfficeLayout;
