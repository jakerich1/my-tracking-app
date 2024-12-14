import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "motion/react";
import { type FC, useState } from "react";
import Page from "@/components/layout/Page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/data/ProgressBar";

const App: FC = () => {
  const currentData = [
    {
      label: "Water",
      id: "water",
      value: 1000,
      target: 3000,
      unit: "ml",
      color: "from-blue-300 to-blue-400",
    },
    {
      label: "Protein",
      id: "protein",
      value: 20,
      target: 150,
      unit: "g",
      color: "from-red-300 to-red-400",
    },
    {
      label: "Calories",
      id: "calories",
      value: 2000,
      target: 3000,
      unit: "kcal",
      color: "from-green-300 to-green-400",
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
              key={data.id}
              {...data}
            />
          );
        })}

        <AnimatePresence>
          {activeIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
};

export default App;
