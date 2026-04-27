(function () {
  const posts = [
    {
      title: "Đại Nam dịp lễ 30/4 - 1/5 có gì đáng chú ý?",
      url: "/blog/dai-nam-dip-le-30-4-1-5-co-gi-dang-chu-y.html"
    },
    {
      title: "Đánh giá thẻ tín dụng các ngân hàng",
      url: "/blog/danh-gia-the-tin-dung-cac-ngan-hang-nen-mo-the-ngan-hang-nao.html"
    },
    {
      title: "Đáo hạn thẻ tín dụng là gì?",
      url: "/blog/dao-han-the-tin-dung-la-gi.html"
    },
    {
      title: "Đáo hạn tín dụng có bị nợ xấu không?",
      url: "/blog/dao-han-tin-dung-co-bi-no-xau-khong.html"
    },
    {
      title: "Rút tiền thẻ tín dụng có an toàn không?",
      url: "/blog/rut-tien-the-tin-dung-co-an-toan-khong.html"
    },
    {
      title: "Hướng dẫn tăng like bài viết Facebook mới nhất",
      url: "/blog/huong-dan-tang-like-bai-viet-facebook-moi-nhat-2026.html"
    }
  ];

  function normalizePath(path) {
    return path.replace(/\/+$/, "");
  }

  function seededNumber(text) {
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function shuffleWithSeed(items, seedText) {
    const result = items.slice();
    let seed = seededNumber(seedText);

    for (let index = result.length - 1; index > 0; index -= 1) {
      seed = Math.imul(seed ^ (seed >>> 15), 2246822519) >>> 0;
      const target = seed % (index + 1);
      const currentItem = result[index];
      result[index] = result[target];
      result[target] = currentItem;
    }

    return result;
  }

  function renderRelatedPosts(container) {
    const currentPath = normalizePath(window.location.pathname);
    const candidates = posts.filter((post) => normalizePath(post.url) !== currentPath);
    const countSeed = seededNumber(`${currentPath}:count`);
    const count = Math.min(candidates.length, 4 + (countSeed % 3));
    const selectedPosts = shuffleWithSeed(candidates, currentPath).slice(0, count);

    container.innerHTML = "";

    selectedPosts.forEach((post) => {
      const link = document.createElement("a");
      link.href = post.url;
      link.className = "rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:text-teal-700";
      link.textContent = post.title;
      container.appendChild(link);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-related-posts]").forEach(renderRelatedPosts);
  });
})();
