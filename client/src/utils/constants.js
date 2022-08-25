//Networks
export const MAINNET = '0x1';   //Decimal => 1
export const RINKEBY = '0x4';   //Decimal => 1
export const GANACHE_UI = '0x539'; //Decimal => 1337
export const GANACHE_UI_NETWORK = '0x1691'; //Decimal => 5777

//Zero Address
export const ZERO_ADDR = '0x0000000000000000000000000000000000000000';

//colors
export const RED = '[#dc2626]';
export const ORANGE = '[#f97316]';
export const GREEN = '[#16a34a]';
export const PRIMARY = '[#9106cd]';
export const PRIMARYHOVER = '[#850cb9]';
export const SECONDARY = '[#00c9b7]';
export const SECONDARYHOVER = '[#36b1a0]';

export const errorMessages = {
    "MIN_FEE": "The minimum participation fee is 0.0001 Ether",
    "ONLY_OWNER": "Only Admin can perform this action",
    "NOT_RUNNING": "The contest is not running for now",
    "NOT_PAUSED": "The contest is paused for now",
    "FINISHED": "The contest has finshed",
    "PARTICIPATION_OPEN": "Participation is still open",
    "NO_CONTESTANTS": "The contest does not have any contestants",
    "VOTING_CLOSED": "Voting is not open",
    "PARTICIPATION_CLOSED": "Participation is not open",
    "FEE": "Please pay the required fee",
    "NO_ADMIN": "Admin not allowed to perform this action",
    "EXISTING": "Contestant already exists",
    "EMPTY_NAME": "The 'Name' field is empty ",
    "EMOTY_LINK": "The 'Link' field is empty ",
    "EMPTY_BIO": "The 'Bio' field is empty ",
    "LONG_BIO": "The 'Bio' field is too long ",
    "INVALID_CONTESTANT": "Not a contestant",
    "ELIMINATED": "Contestant has been eliminated in previous rounds",
    "NO_SELF": "Can't vote for self",
    "NOT_FINISHED": "The contest has not finished yet",
    "NOT_WINNER": "Only the winner can claim the reward",
    "SUBMITTED": "Already submitted"
}