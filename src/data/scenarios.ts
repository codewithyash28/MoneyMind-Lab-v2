export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  xpAwarded: number;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  choices: Choice[];
  icon: string;
}

export const scenarios: Scenario[] = [
  {
    id: 'credit-card-1',
    title: 'Your First Credit Card',
    description: "You've just received your first credit card with a $500 limit. You've spent $450 on clothes and gadgets. Your bill is due in 3 days. What do you do?",
    icon: 'CreditCard',
    choices: [
      {
        id: 'pay-minimum',
        text: 'Pay the minimum amount ($25).',
        isCorrect: false,
        explanation: 'Paying only the minimum amount will lead to high-interest charges on the remaining balance ($425), potentially putting you into long-term debt.',
        xpAwarded: 5
      },
      {
        id: 'pay-full',
        text: 'Pay the full balance ($450).',
        isCorrect: true,
        explanation: 'Excellent! Paying the full balance every month avoids interest charges and helps build a great credit score.',
        xpAwarded: 20
      },
      {
        id: 'ignore',
        text: 'Wait for the next month to pay it all back.',
        isCorrect: false,
        explanation: 'Bad move! Missing a payment will result in late fees and will negatively impact your credit score.',
        xpAwarded: 0
      }
    ]
  },
  {
    id: 'bnpl-1',
    title: 'The "Buy Now, Pay Later" Offer',
    description: "You're online shopping for a new $200 headset. At checkout, you see a 'Buy Now, Pay Later' option: $50 now, and 3 interest-free payments of $50 every two weeks. What should you consider?",
    icon: 'ShoppingBag',
    choices: [
      {
        id: 'check-budget',
        text: 'Check if you have enough in your budget for the next 3 payments.',
        isCorrect: true,
        explanation: "Smart! BNPL is a form of debt. You must ensure you'll have the money in the future, or you might face late fees and credit damage.",
        xpAwarded: 20
      },
      {
        id: 'get-it-free',
        text: "It's interest-free, so it's basically free money! Get it.",
        isCorrect: false,
        explanation: "It's not free money; it's a loan. If you miss a payment, the 'interest-free' part might disappear or you'll be hit with heavy late fees.",
        xpAwarded: 5
      }
    ]
  },
  {
    id: 'scam-1',
    title: 'The Suspicious Bank SMS',
    description: "You receive a text: 'URGENT: Your account has been locked due to suspicious activity. Click here [link] to verify your identity now!' What do you do?",
    icon: 'AlertTriangle',
    choices: [
      {
        id: 'click-link',
        text: 'Click the link and provide your details to unlock the account.',
        isCorrect: false,
        explanation: "Never click links in urgent messages! This is a phishing scam designed to steal your bank login credentials.",
        xpAwarded: 0
      },
      {
        id: 'contact-bank',
        text: "Don't click. Call your bank using the official number on their website or on your card.",
        isCorrect: true,
        explanation: "Perfect! Always use official, verified channels to contact your bank. They will never ask for your PIN or password over text.",
        xpAwarded: 25
      }
    ]
  }
];
