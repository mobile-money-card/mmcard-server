function getServiceFee(amount) {
  if (amount < 2500) return 400;
  if (amount < 5000) return 440;
  if (amount < 15000) return 600;
  if (amount < 30000) return 800;
  if (amount < 45000) return 1000;
  if (amount < 60000) return 1300;
  if (amount < 125000) return 1500;
  if (amount < 250000) return 2000;
  if (amount < 500000) return 5000;
  if (amount < 1000000) return 7000;
  if (amount < 2000000) return 9000;
  if (amount < 5000000) return 10000;
  else return 13000;
}

module.exports = {
  getServiceFee,
};
