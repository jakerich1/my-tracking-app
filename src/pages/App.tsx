import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { type FC, useState } from "react";
import Page from "@/components/layout/Page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/data/ProgressBar";

const App: FC = () => {
  const currentData = [
    {
      label: "Water",
      key: "water",
      value: 1000,
      target: 3000,
      unit: "ml",
      color: "blue",
    },
    {
      label: "Protein",
      key: "protein",
      value: 20,
      target: 150,
      unit: "g",
      color: "red",
    },
    {
      label: "Calories",
      key: "calories",
      value: 2000,
      target: 3000,
      unit: "kcal",
      color: "green",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [entryValue, setEntryValue] = useState<string>("");
  const [entryDescription, setEntryDescription] = useState<string>("");

  return (
    <Page title="Tracker">
      <div className="flex flex-col gap-4">
        {currentData.map((data, i) => {
          if (activeIndex !== null && activeIndex !== i) return null;
          return (
            <ProgressBar
              onClick={() => {
                setActiveIndex(i);
              }}
              {...data}
            />
          );
        })}

        {activeIndex !== null && (
          <Card>
            <CardHeader>
              <CardTitle>{currentData[activeIndex].label}</CardTitle>
              <CardDescription>
                {`${currentData[activeIndex].value} out of ${currentData[activeIndex].target}${currentData[activeIndex].unit}`}
                <br />
                {`You have ${
                  currentData[activeIndex].target -
                  currentData[activeIndex].value
                }${currentData[activeIndex].unit} remaining`}
                <br />
                {`You are ${Math.round(
                  (currentData[activeIndex].value /
                    currentData[activeIndex].target) *
                    100
                )}% complete`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Input
                  id="entryValue"
                  type="number"
                  value={entryValue}
                  onChange={(e) => setEntryValue(e.target.value)}
                  placeholder="Value"
                />
                <Input
                  id="entryDescription"
                  type="text"
                  value={entryDescription}
                  onChange={(e) => setEntryDescription(e.target.value)}
                  placeholder="Description"
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveIndex(null);
                    setEntryValue("");
                    setEntryDescription("");
                  }}
                >
                  Close
                </Button>
                <Button>Submit</Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </Page>
  );
};

export default App;
