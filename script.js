window.onload = () => {
  const button = document.getElementById("checkBtn");
  button.addEventListener("click", checkEligibility);
};

function checkEligibility() {
  const urInput = document.getElementById("ur_rank").value;
  const catInput = document.getElementById("cat_rank").value;
  const category = document.getElementById("category").value.toUpperCase();
  const resultList = document.getElementById("result");
  resultList.innerHTML = "";

  const urRank = urInput ? parseInt(urInput) : null;
  const catRank = catInput ? parseInt(catInput) : null;

  // 🔍 Input validation
  if (!category) {
    resultList.innerHTML = "<li>Please select a category.</li>";
    return;
  }

  if (category === "UR" && (urRank === null || isNaN(urRank))) {
    resultList.innerHTML = "<li>Please enter your UR Rank.</li>";
    return;
  }

  if (category !== "UR" && (catRank === null || isNaN(catRank))) {
    resultList.innerHTML = "<li>Please enter your Category Rank.</li>";
    return;
  }

  // 🔎 Main filtering
  const eligible = colleges.filter(item => {
    const itemCategory = item.category?.toUpperCase();
    if (itemCategory !== category) return false;

    const urMatch = urRank !== null &&
                    item.ur_opening_rank != null &&
                    item.ur_closing_rank != null &&
                    urRank >= item.ur_opening_rank &&
                    urRank <= item.ur_closing_rank;

    const catMatch = catRank !== null &&
                     item.cat_opening_rank != null &&
                     item.cat_closing_rank != null &&
                     catRank >= item.cat_opening_rank &&
                     catRank <= item.cat_closing_rank;

    // ✅ Category-based logic
    return category === "UR" ? urMatch : catMatch;
  });

  // 🟡 Result output
  if (eligible.length === 0) {
    resultList.innerHTML = "<li>No eligible institute found based on your input.</li>";
    return;
  }

  eligible.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.institute}</strong> – ${item.course}<br>
      <small>
        Category: ${item.category}<br>
        UR Rank: ${item.ur_opening_rank ?? "N/A"} - ${item.ur_closing_rank ?? "N/A"}<br>
        Cat Rank: ${item.cat_opening_rank ?? "N/A"} - ${item.cat_closing_rank ?? "N/A"}
      </small>
    `;
    resultList.appendChild(li);
  });
}
