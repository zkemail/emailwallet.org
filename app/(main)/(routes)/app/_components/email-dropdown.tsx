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
    name: "Outlook",
    value: "outlook",
    icon: PiMicrosoftOutlookLogo,
  },
  {
    name: "Default",
    value: "mailto:",
    icon: FaMailBulk,
  },
];

interface EmailDropdownProps {
  setProvider: (value: string) => void;
}

export const EmailDropdown = ({ setProvider }: EmailDropdownProps) => {
  return (
    <Select onValueChange={setProvider}>
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
