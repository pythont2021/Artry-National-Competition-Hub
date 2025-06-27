"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxOption {
    label: string;
    value: string;
}

interface ComboboxOptionGroup {
    heading: string;
    options: ComboboxOption[];
}

function isGrouped(options: (ComboboxOption | ComboboxOptionGroup)[]): options is ComboboxOptionGroup[] {
    return options.length > 0 && 'heading' in options[0] && 'options' in options[0];
}

interface ComboboxProps {
    options: ComboboxOption[] | ComboboxOptionGroup[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    emptyMessage?: string;
}

export function Combobox({ options, value, onChange, placeholder, emptyMessage }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedLabel = React.useMemo(() => {
    if (!value) return placeholder || "Select option...";
    
    let allOptions: ComboboxOption[] = [];
    if (isGrouped(options)) {
        allOptions = options.flatMap(group => group.options);
    } else {
        allOptions = options as ComboboxOption[];
    }

    const found = allOptions.find((option) => option.value === value);
    return found ? found.label : placeholder || "Select option...";

  }, [value, options, placeholder]);


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-left font-normal"
        >
          <span className="truncate">{selectedLabel}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={placeholder || "Search option..."} />
          <CommandList>
            <CommandEmpty>{emptyMessage || "No option found."}</CommandEmpty>
            {isGrouped(options) ? (
                options.map((group) => (
                    <CommandGroup key={group.heading} heading={group.heading}>
                        {group.options.map((option) => (
                             <CommandItem
                                key={option.value}
                                value={option.value}
                                onSelect={(currentValue) => {
                                    onChange(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    value === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                ))
            ) : (
                <CommandGroup>
                {(options as ComboboxOption[]).map((option) => (
                    <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue)
                        setOpen(false)
                    }}
                    >
                    <Check
                        className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                        )}
                    />
                    {option.label}
                    </CommandItem>
                ))}
                </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
