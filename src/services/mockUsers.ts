import type { User, UserStatus } from '@/types/user';

const firstNames = ['Grace', 'Debby', 'Tosin', 'Adedeji', 'Ifeoma', 'Aisha', 'Musa', 'Emeka', 'Chioma', 'Bola'];
const lastNames = ['Effiom', 'Oghana', 'Dakunmu', 'Okafor', 'Balogun', 'Ibrahim', 'Etim', 'Lawal', 'Udo', 'Eze'];
const orgs = ['Lendsqr', 'Irorun', 'Lendstar', 'Kredi', 'Paystack', 'Renmoney'];
const statuses: UserStatus[] = ['Inactive', 'Pending', 'Active', 'Blacklisted'];

const padPhone = (index: number) => `0${7060000000 + index * 731}`;

export const buildMockUsers = (count = 500): User[] =>
  Array.from({ length: count }, (_, index) => {
    const first = firstNames[index % firstNames.length];
    const last = lastNames[(index * 3) % lastNames.length];
    const fullName = `${first} ${last}`;
    const username = `${first}${last}`.toLowerCase();
    const organization = orgs[index % orgs.length];
    const joined = new Date(2020, (index * 2) % 12, (index % 27) + 1, 10, index % 60);

    return {
      id: `LSQF${String(10000 + index)}`,
      organization,
      username,
      fullName,
      email: `${username}${index}@${organization.toLowerCase()}.com`,
      phoneNumber: padPhone(index),
      dateJoined: joined.toISOString(),
      status: statuses[index % statuses.length],
      accountNumber: String(1234567890 + index),
      bankName: 'Providus Bank',
      tier: ((index % 3) + 1) as 1 | 2 | 3,
      balance: 200000 + index * 1450,
      bvn: padPhone(index + 99),
      gender: index % 2 === 0 ? 'Female' : 'Male',
      maritalStatus: index % 4 === 0 ? 'Married' : 'Single',
      children: index % 4 === 0 ? '2' : 'None',
      residence: "Parent's Apartment",
      education: {
        level: index % 3 === 0 ? 'B.Sc' : 'HND',
        employmentStatus: 'Employed',
        sector: 'FinTech',
        duration: `${(index % 5) + 1} years`,
        officeEmail: `${username}@workmail.com`,
        monthlyIncome: [200000 + index * 300, 400000 + index * 300],
        loanRepayment: 40000 + index * 100,
      },
      socials: {
        twitter: `@${username}`,
        facebook: fullName,
        instagram: `@${username}`,
      },
      guarantors: [
        {
          fullName: 'Debby Oghana',
          phoneNumber: '07060780922',
          email: 'debby@gmail.com',
          relationship: 'Sister',
        },
        {
          fullName: 'Samuel Effiom',
          phoneNumber: '08012345678',
          email: 'samuel@gmail.com',
          relationship: 'Brother',
        },
      ],
    };
  });
