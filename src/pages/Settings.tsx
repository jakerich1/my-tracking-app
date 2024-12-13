import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import useStore from "../store";
import { type FC, useState } from "react";
import Page from "@/components/layout/Page";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings: FC = () => {
  const [tempApiKey, setTempApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const { apiKey, setApiKey } = useStore();

  const handleSaveApiKey = () => {
    setApiKey(tempApiKey);
    setTempApiKey("");
    setIsEditing(false);
  };

  return (
    <Page title="Settings" apiCheck={false}>
      {!apiKey && !isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Missing API Key</CardTitle>
            <CardDescription>Enter below</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              id="apiKey"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="API Key"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveApiKey}>Submit</Button>
          </CardFooter>
        </Card>
      )}

      {apiKey && !isEditing && (
        <Button onClick={() => setIsEditing(true)}>Edit API Key</Button>
      )}

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Edit API Key</CardTitle>
            <CardDescription>Update your API key below</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              id="editApiKey"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="New API Key"
            />
          </CardContent>
          <CardFooter>
            <Button className="mr-2" onClick={handleSaveApiKey}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
      )}
    </Page>
  );
};

export default Settings;
