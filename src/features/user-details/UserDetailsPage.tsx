import { ArrowLeftIcon } from "@/assets/Icons";
import { EmptyState } from "@/components/feedback/Skeleton";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useUserStore } from "@/store/userStore";
import { formatCurrency } from "@/utils/formatters";
import { Star, UserRound } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const tabs = [
  "General Details",
  "Documents",
  "Bank Details",
  "Loans",
  "Savings",
  "App and System",
];

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function UserDetailsPage() {
  const { id } = useParams();
  const selectedUser = useUserStore((state) => state.selectedUser);
  const user = selectedUser?.id === id ? selectedUser : null;

  if (!user) {
    return (
      <section className="page">
        <Link className="back-link" to="/users">
          <ArrowLeftIcon />
          Back to Users
        </Link>
        <EmptyState
          title="User details unavailable"
          body="Select a user from the users table to persist and view their profile."
        />
      </section>
    );
  }

  return (
    <section className="user-details page">
      <Link className="back-link" to="/users">
        <ArrowLeftIcon />
        Back to Users
      </Link>
      <div className="user-details__header">
        <h1>User Details</h1>
        <div>
          <Button variant="danger">Blacklist User</Button>
          <Button variant="outline">Activate User</Button>
        </div>
      </div>

      <Card className="profile-card">
        <div className="profile-card__summary">
          <span className="profile-card__avatar">
            <UserRound size={36} />
          </span>
          <div>
            <h2>{user.fullName}</h2>
            <p>{user.id}</p>
          </div>
          <div className="profile-card__tier">
            <span>User's Tier</span>
            <div aria-label={`${user.tier} star tier`}>
              {Array.from({ length: 3 }, (_, index) => (
                <Star
                  key={index}
                  size={14}
                  fill={index < user.tier ? "#e9b200" : "none"}
                />
              ))}
            </div>
          </div>
          <div>
            <h2>{formatCurrency(user.balance)}</h2>
            <p className="profile-card__account">
              {user.accountNumber}/{user.bankName}
            </p>
          </div>
        </div>
        <nav className="profile-card__tabs" aria-label="User details sections">
          {tabs.map((tab, index) => (
            <button
              className={index === 0 ? "profile-card__tab--active" : ""}
              type="button"
              key={tab}
            >
              {tab}
            </button>
          ))}
        </nav>
      </Card>

      <Card className="details-card">
        <section>
          <h2>Personal Information</h2>
          <dl className="details-grid">
            <Detail label="Full Name" value={user.fullName} />
            <Detail label="Phone Number" value={user.phoneNumber} />
            <Detail label="Email Address" value={user.email} />
            <Detail label="BVN" value={user.bvn} />
            <Detail label="Gender" value={user.gender} />
            <Detail label="Marital Status" value={user.maritalStatus} />
            <Detail label="Children" value={user.children} />
            <Detail label="Type of Residence" value={user.residence} />
          </dl>
        </section>
        <section>
          <h2>Education and Employment</h2>
          <dl className="details-grid">
            <Detail label="Level of Education" value={user.education.level} />
            <Detail
              label="Employment Status"
              value={user.education.employmentStatus}
            />
            <Detail
              label="Sector of Employment"
              value={user.education.sector}
            />
            <Detail
              label="Duration of Employment"
              value={user.education.duration}
            />
            <Detail label="Office Email" value={user.education.officeEmail} />
            <Detail
              label="Monthly Income"
              value={`${formatCurrency(user.education.monthlyIncome[0])} - ${formatCurrency(user.education.monthlyIncome[1])}`}
            />
            <Detail
              label="Loan Repayment"
              value={formatCurrency(user.education.loanRepayment)}
            />
          </dl>
        </section>
        <section>
          <h2>Socials</h2>
          <dl className="details-grid">
            <Detail label="Twitter" value={user.socials.twitter} />
            <Detail label="Facebook" value={user.socials.facebook} />
            <Detail label="Instagram" value={user.socials.instagram} />
          </dl>
        </section>
        <section>
          <h2>Guarantor</h2>
          {user.guarantors.map((guarantor) => (
            <dl
              className="details-grid details-grid--guarantor"
              key={`${guarantor.email}-${guarantor.relationship}`}
            >
              <Detail label="Full Name" value={guarantor.fullName} />
              <Detail label="Phone Number" value={guarantor.phoneNumber} />
              <Detail label="Email Address" value={guarantor.email} />
              <Detail label="Relationship" value={guarantor.relationship} />
            </dl>
          ))}
        </section>
      </Card>
    </section>
  );
}
