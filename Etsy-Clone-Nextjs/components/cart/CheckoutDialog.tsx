import { useEffect, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { placeOrder as placeOrder } from "@/app/api";
import { Input, Label, Textarea } from "../ui/Form";
import ButtonLink from "../ui/ButtonLink";
import { toast } from "sonner";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [creditCardNumber, setCreditCardNumber] = useState("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setCreditCardNumber("");
      setShippingAddress("");
      setBillingAddress("");
      setContactPhone("");
      setNotes("");
      setError(null);
      setSuccess(null);
      setIsProcessing(false);
    }
  }, [open]);

  const handlePlaceOrder = async () => {
    setError(null);
    setSuccess(null);

    if (!creditCardNumber) {
      setError("Credit card number is required.");
      return;
    }

    setIsProcessing(true);

    const orderPayload = {
      shipping_address: shippingAddress,
      billing_address: billingAddress || null,
      contact_phone: contactPhone,
      notes: notes || null,
      payment_method: `${creditCardNumber} Credit Card`,
    };

    try {
      const responseData = await placeOrder(orderPayload);

      if (responseData && responseData.success) {
        setSuccess("Order placed successfully!");
      } else {
        setError(responseData.message || "Failed to place order.");
      }
    } catch (apiError: any) {
      setError(
        apiError.message || "An error occurred while placing the order."
      );
      console.error("API Error:", apiError);
    } finally {
      setIsProcessing(false);
      onOpenChange(false);
      toast.success(success)
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>Complete Your Order</DialogTitle>
        <DialogDescription>
          Please provide your payment details to finalize your purchase.
        </DialogDescription>
      </DialogHeader>

      <div className="my-2">
        {/* <p>Total Price: ${totalPrice.toFixed(2)}</p> */}
        <p>Status: {"Pending"}</p>
      </div>

      <div className="grid gap-4 py-2">
        <div>
          <label
            htmlFor="creditCard"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Credit Card Number
          </label>
          <Input
            id="creditCard"
            type="text"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="shippingAddress">Shipping Address</Label>
          <Textarea
            id="shippingAddress"
            rows={3}
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="billingAddress">Billing Address (Optional)</Label>
          <Textarea
            id="billingAddress"
            rows={3}
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="contactPhone">Contact Phone</Label>
          <Input
            id="contactPhone"
            type="text"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            disabled={isProcessing}
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea
            id="notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isProcessing}
          />
        </div>
      </div>

      {/* Display Error or Success Messages */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

      <DialogFooter>
        <ButtonLink onClick={handlePlaceOrder} disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Place Order"}
        </ButtonLink>
      </DialogFooter>
    </Dialog>
  );
};
