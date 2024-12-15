import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useStore from "@/store";
import { AlertCircle } from "lucide-react";
import Page from "@/components/layout/Page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type FC, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ProgressBar from "@/components/data/ProgressBar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const App: FC = () => {
  const { trackingData, setTrackingData } = useStore();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [entryValue, setEntryValue] = useState<string>("");
  const [entryDescription, setEntryDescription] = useState<string>("");
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = () => {
    const parsedValue = parseFloat(entryValue);

    if (isNaN(parsedValue)) {
      setSubmissionError("Value is not a number");
      return;
    }

    if (parsedValue < 0) {
      setSubmissionError("Value cannot be negative");
      return;
    }

    if (submissionError && submissionError.length > 128) {
      setSubmissionError("Description is too long (max 128 characters)");
    }

    setSubmissionError(null);

    const dateSetToMorning = new Date().setHours(0, 0, 0, 0);
    const date = new Date(dateSetToMorning).toISOString();

    setTrackingData(
      date,
      currentData[activeIndex!].id,
      parsedValue,
      entryDescription,
      new Date().toISOString()
    );
  };

  const currentData = useMemo(() => {
    return [
      {
        label: "Water",
        id: "water",
        unit: "ml",
        target: 3000,
        color: "from-blue-300 to-blue-400",
      },
      {
        label: "Protein",
        id: "protein",
        unit: "g",
        target: 150,
        color: "from-red-300 to-red-400",
      },
      {
        label: "Calories",
        id: "calories",
        unit: "kcal",
        target: 2800,
        color: "from-green-300 to-green-400",
      },
    ];
  }, []);

  const currentDayData = useMemo(() => {
    const dateSetToMorning = new Date().setHours(0, 0, 0, 0);
    const date = new Date(dateSetToMorning).toISOString();

    return trackingData[date] || [];
  }, [trackingData]);

  const currentDayValueTotals = useMemo(() => {
    const currentDataKeys = currentData.map((data) => data.id);

    const totals: Record<string, number> = {};

    currentDayData.forEach((entry) => {
      if (currentDataKeys.includes(entry.key)) {
        if (!totals[entry.key]) {
          totals[entry.key] = 0;
        }

        totals[entry.key] += entry.value;
      }
    });

    return totals;
  }, [currentData, currentDayData]);

  const currentDayTableDataByActiveIndex = useMemo(() => {
    if (activeIndex === null) return [];

    return currentDayData.filter(
      (entry) => entry.key === currentData[activeIndex].id
    );
  }, [activeIndex, currentData, currentDayData]);

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
              value={currentDayValueTotals[data.id] || 0}
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
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{currentData[activeIndex].label}</CardTitle>
                    <CardDescription>
                      {`${
                        currentDayValueTotals[currentData[activeIndex].id] || 0
                      } out of ${currentData[activeIndex].target}${
                        currentData[activeIndex].unit
                      }`}
                      <br />
                      {`You have ${
                        currentData[activeIndex].target -
                        (currentDayValueTotals[currentData[activeIndex].id] ||
                          0)
                      }${currentData[activeIndex].unit} remaining`}
                      <br />
                      {`You are ${
                        Math.round(
                          (currentDayValueTotals[currentData[activeIndex].id] /
                            currentData[activeIndex].target) *
                            100
                        ) || 0
                      }% complete`}
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
                    <div className="flex gap-2 flex-col w-full">
                      {submissionError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>{submissionError}</AlertDescription>
                        </Alert>
                      )}
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
                        <Button onClick={handleSubmit}>Submit</Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>

                {currentDayTableDataByActiveIndex.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {currentData[activeIndex].label} History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableCaption>
                          A list of your current{" "}
                          {currentData[activeIndex].label} history for today
                        </TableCaption>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">
                              Value {currentData[activeIndex].unit}
                            </TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentDayTableDataByActiveIndex.map((entry) => (
                            <TableRow key={entry.dateString}>
                              <TableCell>{entry.value}</TableCell>
                              <TableCell>{entry.description}</TableCell>
                              <TableCell>
                                {new Date(
                                  entry.dateString
                                ).toLocaleTimeString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
};

export default App;
