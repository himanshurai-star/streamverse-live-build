
import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface FinancialInformationProps {
  formData: any;
  setFormData: (data: any) => void;
}

const FinancialInformation = ({ formData, setFormData }: FinancialInformationProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bank Account Details</CardTitle>
          <CardDescription>Add your bank account for creator payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                value={formData.financial.bankAccount}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  financial: { ...prev.financial, bankAccount: e.target.value }
                }))}
                placeholder="Enter your bank account number"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="routingNumber">Routing Number *</Label>
              <Input
                id="routingNumber"
                value={formData.financial.routingNumber}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  financial: { ...prev.financial, routingNumber: e.target.value }
                }))}
                placeholder="Bank routing number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type *</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="checking">Checking Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Information</CardTitle>
          <CardDescription>Required for tax reporting and compliance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="panNumber">PAN Number (India) *</Label>
              <Input
                id="panNumber"
                value={formData.financial.panNumber}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  financial: { ...prev.financial, panNumber: e.target.value }
                }))}
                placeholder="ABCDE1234F"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / Social Security *</Label>
              <Input
                id="taxId"
                value={formData.financial.taxId}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  financial: { ...prev.financial, taxId: e.target.value }
                }))}
                placeholder="Tax identification number"
              />
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Security:</strong> All financial information is encrypted and stored securely. 
              We use this information only for payment processing and tax compliance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialInformation;
