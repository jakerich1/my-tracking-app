import { type FC } from "react";
import useStore from "../../store";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PageProps {
  title: string;
  apiCheck?: boolean;
  children: React.ReactNode;
}

const Page: FC<PageProps> = ({ title, children, apiCheck = true }) => {
  const { apiKey } = useStore();

  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {title}
        </h1>
        <SidebarTrigger />
      </div>

      {!apiKey && apiCheck ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            You need to set an API key in{" "}
            <Link className="underline" to="/settings">
              settings
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        children
      )}
    </div>
  );
};

export default Page;
