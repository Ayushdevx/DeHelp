"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Pencil, X, Check, Loader2, User } from "lucide-react";

interface EditUserNameProps {
  className?: string;
  onUpdate?: (newValue: string) => void;
}

export function EditUserName({ 
  className,
  onUpdate
}: EditUserNameProps) {
  // Set default name to Ayush Upadhyay
  const [value, setValue] = useState("Ayush Upadhyay");
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("Ayush Upadhyay");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing) {
      setInputValue(value);
    }
  }, [isEditing, value]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim input and check if it's not empty
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      setError("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate an update (replace with actual update logic)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Name updated successfully", {
        description: `New name: ${trimmedValue}`
      });
      
      // Update local state
      setValue(trimmedValue);
      setIsEditing(false);
      
      // Notify parent component if callback exists
      onUpdate?.(trimmedValue);
    } catch (err) {
      console.error("Error updating name:", err);
      toast.error("Failed to update name", {
        description: "Please try again later"
      });
      setError("Failed to update name");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <Card className="p-4 bg-background/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className={`pr-10 ${className} ${error ? 'border-red-500' : ''}`}
                placeholder="Enter new name"
                disabled={isLoading}
                autoFocus
              />
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                size="icon" 
                variant="default"
                disabled={isLoading || !inputValue.trim()}
                className="relative"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
              </Button>
              <Button 
                type="button" 
                size="icon" 
                variant="outline" 
                onClick={handleEditToggle}
                disabled={isLoading}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </form>
      </Card>
    );
  }

  return (
    <div className="group flex items-center space-x-2">
      <h1 className="text-3xl font-bold tracking-wide text-primary">
        {value}
      </h1>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleEditToggle}
        className="opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default EditUserName;