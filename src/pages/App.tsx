import { type FC } from "react";
import Page from "@/components/layout/Page";
import { Label } from "@/components/ui/label";

const App: FC = () => {
  return (
    <Page title="Tracker">
      <div className="w-full">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between">
              <Label>Water</Label>
              <span className="text-xs text-gray-500">1.5L / 2L</span>
            </div>
            <div className="flex w-full h-12 bg-gray-300 rounded-md shadow-lg overflow-hidden">
              <div
                className="transition-all duration-150 ease-in-out h-full bg-gradient-to-r from-blue-300 to-blue-400"
                style={{ flexBasis: `${20}%` }}
              ></div>
              <div className="h-full flex-grow bg-gradient-to-r from-zinc-200 to-zinc-300"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label>Protein</Label>
              <span className="text-xs text-gray-500">20g / 100g</span>
            </div>
            <div className="flex w-full h-12 bg-gray-300 rounded-md shadow-lg overflow-hidden">
              <div
                className="transition-all duration-150 ease-in-out h-full bg-gradient-to-r from-red-300 to-red-400"
                style={{ flexBasis: `${20}%` }}
              ></div>
              <div className="h-full flex-grow bg-gradient-to-r from-zinc-200 to-zinc-300"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <Label>Calories</Label>
              <span className="text-xs text-gray-500">2000 / 2500 kcal</span>
            </div>
            <div className="flex w-full h-12 bg-gray-300 rounded-md shadow-lg overflow-hidden">
              <div
                className="transition-all duration-150 ease-in-out h-full bg-gradient-to-r from-green-300 to-green-400"
                style={{ flexBasis: `${20}%` }}
              ></div>
              <div className="h-full flex-grow bg-gradient-to-r from-zinc-200 to-zinc-300"></div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default App;
