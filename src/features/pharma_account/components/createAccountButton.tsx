// import { Button, CircularProgress, Stack } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// interface CreateAccountButtonProps {
//   onSubmit: () => void;
//   isPending: boolean;
// }

// const CreateAccountButton: React.FC<CreateAccountButtonProps> = ({
//   onSubmit,
//   isPending,
// }) => {
//   console.log("CreateAccountButton rendered with isPending:", isPending); // Debugging log
//   const navigate = useNavigate();
//   return (
//     <Stack
//       direction="row"
//       spacing={2}
//       sx={{ mt: 5, justifyContent: "flex-end" }}
//     >
//       <Button
//         variant="contained"
//         size="large"
//         onClick={() =>
//           navigate("/admin/subscription-plans", {
//             state: {
//               returnTo: "/admin/create-account",
//             },
//           })
//         }
//         sx={{
//           bgcolor: "primary.main",
//         }}
//       >
//         إضافة باقة الاشتراك
//       </Button>
//       {/* هذا الزر لانشاء الصيدلية تم ايقافه مؤقتا لتفيذ اضافة الاشتراك*/}
//       {/* <Button
//         variant="contained"
//         size="large"
//         disabled={isPending}
//         onClick={onSubmit}
//         sx={{
//           bgcolor: "primary.main",
//         }}
//       >
//         {isPending ? (
//           <CircularProgress size={24} color="inherit" />
//         ) : (
//           " إنشاء الحساب"
//         )}
//       </Button> */}

//       <Button variant="text" size="large">
//         إلغاء
//       </Button>
//     </Stack>
//   );
// };

// export default CreateAccountButton;

// CreateAccountButton.tsx
// CreateAccountButton.tsx

import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { PharmacyRegistrationForm } from "../types/createPharamacyFormTypes";

interface CreateAccountButtonProps {
  onSubmit: () => void;
  isPending: boolean;
  formData: PharmacyRegistrationForm;
  hasPlan: boolean;
}

const CreateAccountButton: React.FC<CreateAccountButtonProps> = ({
  onSubmit,
  isPending,
  formData,
  hasPlan,
}) => {
  const navigate = useNavigate();

  const handleNavigateToPlans = () => {
    navigate("/admin/subscription-plans", {
      state: { returnTo: "/admin/create-account" }, // نرسل فقط أين نريد العودة
    });
  };

  return (
    <Stack
      direction="column"
      spacing={2}
      sx={{ mt: 5, alignItems: "flex-end" }}
    >
      <Stack direction="row" spacing={2} sx={{ gap: 2 }}>
        {!hasPlan ? (
          <Button
            variant="contained"
            size="large"
            onClick={handleNavigateToPlans}
            sx={{ bgcolor: "primary.main" }}
          >
            إضافة باقة الاشتراك
          </Button>
        ) : (
          <Button
            variant="contained"
            size="large"
            disabled={isPending}
            onClick={onSubmit}
            sx={{ bgcolor: "primary.main" }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "إنشاء حساب الصيدلية"
            )}
          </Button>
        )}

        {hasPlan && (
          <Button
            variant="outlined"
            size="large"
            onClick={handleNavigateToPlans}
          >
            تغيير الباقة
          </Button>
        )}

        <Button
          variant="text"
          size="large"
          onClick={() => {
            sessionStorage.removeItem("pharmacy_reg_form");
            navigate("/admin/dashboard"); // أو أي مسار إلغاء
          }}
        >
          إلغاء
        </Button>
      </Stack>
    </Stack>
  );
};

export default CreateAccountButton;
