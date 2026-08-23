export const getDashboardOverviewStats = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          totalCourses: 8,
          activeCourses: 8,
          totalLearners: 9,
          notVerifiedLearners: 0,
        }
      });
    }, 500);
  });
};
