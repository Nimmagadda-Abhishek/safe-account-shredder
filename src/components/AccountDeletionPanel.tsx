import { useState } from "react";
import { AlertTriangle, Check, X, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AccountDeletionPanelProps {
  logoUrl: string;
  userEmail: string;
  deletionDate: string;
}

export default function AccountDeletionPanel({
  logoUrl,
  userEmail,
  deletionDate,
}: AccountDeletionPanelProps) {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");
  const [emailConfirmation, setEmailConfirmation] = useState<string>("");
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const deletionReasons = [
    "No longer need the service",
    "Found a better alternative",
    "Too expensive",
    "Privacy concerns",
    "Technical issues",
    "Other",
  ];

  const willBeDeleted = [
    "Your profile and account settings",
    "All your projects and files",
    "Payment methods and billing history",
    "Team memberships and invitations",
  ];

  const willBeRetained = [
    "Anonymized usage statistics",
    "Transaction records (legal requirement)",
    "Public contributions to shared projects",
  ];

  const isEmailValid = emailConfirmation.toLowerCase() === userEmail.toLowerCase();
  const isFormValid = selectedReason && isEmailValid;
  const isDeleteConfirmValid = deleteConfirmation === "DELETE";

  const handleDeleteClick = () => {
    if (!isFormValid) {
      if (!isEmailValid) {
        setEmailError("Email does not match your account email");
      }
      return;
    }
    setEmailError("");
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!isDeleteConfirmValid) return;

    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsDeleting(false);
    setShowConfirmModal(false);
    setIsDeleted(true);
  };

  if (isDeleted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-success">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <Check className="w-6 h-6 text-success" aria-hidden="true" />
            </div>
            <CardTitle className="text-2xl text-success">Account Deletion Scheduled</CardTitle>
            <CardDescription>
              Your account will be permanently deleted on {deletionDate}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-4 text-foreground">Confirmation Email Preview</h3>
              <div className="space-y-3 text-sm">
                <div className="pb-3 border-b border-border">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">To:</strong> {userEmail}
                  </p>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Subject:</strong> Account Deletion
                    Confirmation
                  </p>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p>Hello,</p>
                  <p>
                    This email confirms that your account deletion request has been received and
                    scheduled.
                  </p>
                  <p>
                    <strong className="text-foreground">Deletion Date:</strong> {deletionDate}
                  </p>
                  <p>
                    You can cancel this request by logging into your account before the scheduled
                    deletion date.
                  </p>
                  <p>If you have any questions, please contact our support team.</p>
                  <p className="pt-2">Best regards,<br />The Support Team</p>
                </div>
              </div>
            </div>

            <div
              className="p-4 rounded-lg bg-warning/10 border border-warning/20"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm text-foreground">
                <strong>Important:</strong> You can cancel this deletion request by logging in
                before {deletionDate}.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logoUrl}
              alt="Company logo"
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-destructive" aria-hidden="true" />
            Delete Account
          </CardTitle>
          <CardDescription>
            This action is permanent and cannot be undone. Please review the information below
            carefully.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* What will be deleted/retained */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <X className="w-4 h-4 text-destructive" aria-hidden="true" />
                Will be deleted
              </h3>
              <ul className="space-y-2" role="list">
                {willBeDeleted.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-destructive mt-1" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Check className="w-4 h-4 text-success" aria-hidden="true" />
                Will be retained
              </h3>
              <ul className="space-y-2" role="list">
                {willBeRetained.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-success mt-1" aria-hidden="true">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reason selection */}
          <div className="space-y-2">
            <Label htmlFor="deletion-reason">
              Reason for deletion <span className="text-destructive">*</span>
            </Label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger id="deletion-reason" aria-required="true">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {deletionReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Other reason textarea */}
          {selectedReason === "Other" && (
            <div className="space-y-2">
              <Label htmlFor="other-reason">Please specify</Label>
              <Textarea
                id="other-reason"
                placeholder="Tell us more about why you're leaving..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="min-h-[100px]"
                aria-label="Specify your reason for account deletion"
              />
            </div>
          )}

          {/* Email confirmation */}
          <div className="space-y-2">
            <Label htmlFor="email-confirm">
              Type your email to confirm <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email-confirm"
              type="email"
              placeholder={userEmail}
              value={emailConfirmation}
              onChange={(e) => {
                setEmailConfirmation(e.target.value);
                setEmailError("");
              }}
              aria-required="true"
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "email-error" : undefined}
              className={emailError ? "border-destructive" : ""}
            />
            {emailError && (
              <p
                id="email-error"
                className="text-sm text-destructive"
                role="alert"
                aria-live="polite"
              >
                {emailError}
              </p>
            )}
            {isEmailValid && emailConfirmation && (
              <p className="text-sm text-success flex items-center gap-1">
                <Check className="w-4 h-4" aria-hidden="true" />
                Email confirmed
              </p>
            )}
          </div>

          {/* Delete button */}
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleDeleteClick}
            disabled={!isFormValid}
            aria-label="Delete account"
          >
            <AlertTriangle className="w-4 h-4 mr-2" aria-hidden="true" />
            Delete My Account
          </Button>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent aria-describedby="confirm-dialog-description">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" aria-hidden="true" />
              Final Confirmation Required
            </DialogTitle>
            <DialogDescription id="confirm-dialog-description">
              This is your last chance to cancel. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div
              className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
              role="alert"
            >
              <p className="text-sm text-foreground font-medium mb-2">
                You are about to permanently delete:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4" role="list">
                <li>• Account: {userEmail}</li>
                <li>• Reason: {selectedReason}</li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delete-confirm">
                Type <strong>DELETE</strong> to confirm
              </Label>
              <Input
                id="delete-confirm"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder="DELETE"
                aria-required="true"
                aria-invalid={deleteConfirmation && !isDeleteConfirmValid}
                autoFocus
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowConfirmModal(false);
                setDeleteConfirmation("");
              }}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={!isDeleteConfirmValid || isDeleting}
              aria-label="Confirm account deletion"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  Deleting...
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 mr-2" aria-hidden="true" />
                  Delete Forever
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

