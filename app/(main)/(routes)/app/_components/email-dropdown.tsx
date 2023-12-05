import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaMailBulk, FaYahoo } from "react-icons/fa";
import { PiMicrosoftOutlookLogo } from "react-icons/pi";
import { TbBrandGmail } from "react-icons/tb";
import { useLocalStorage } from "usehooks-ts";
import { SiProton } from "react-icons/si";
import { CiCloudOn } from "react-icons/ci";

const providers = [
  {
    name: "Gmail",
    value: "gmail",
    icon: TbBrandGmail,
  },
  {
    name: "Yahoo",
    value: "yahoo",
    icon: FaYahoo,
  },
  {
    name: "iCloud",
    value: "icloud",
    icon: CiCloudOn,
  },
  {
    name: "Outlook",
    value: "outlook",
    icon: PiMicrosoftOutlookLogo,
  },
  {
    name: "Proton",
    value: "proton",
    icon: SiProton,
  },
  {
    name: "Default",
    value: "mailto:",
    icon: FaMailBulk,
  },
];

interface EmailDropdownProps {
  setProvider: (value: string) => void;
  provider: string;
}

export const EmailDropdown = ({
  setProvider,
  provider,
}: EmailDropdownProps) => {
  const [selectedProvider, setSelectedProvider] = useLocalStorage(
    "selectedProvider",
    provider,
  );

  const handleSelect = (value: string) => {
    setProvider(value);
    setSelectedProvider(value);
  };

  return (
    <Select
      value={selectedProvider ? selectedProvider : provider}
      onValueChange={handleSelect}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Mail Provider" />
      </SelectTrigger>
      <SelectContent side="top">
        {providers.map((provider) => (
          <SelectItem value={provider.value} key={provider.value}>
            <div className="flex items-center gap-2">
              <provider.icon />
              {provider.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
