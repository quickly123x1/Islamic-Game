// نظام اختبار الموسوعة: 5 أسئلة ومكافأة حسب الإجابات الصحيحة فقط
window.v5ArticleQuiz = id => {
  const v = data();
  const article = ARTICLES.find(item => item.id === id);

  if (!article) return;

  if (v.library.completed.includes(id)) {
    notify('تم إكمال الاختبار', 'حصلت على مكافأته سابقًا.');
    return;
  }

  if (!Array.isArray(article.quiz) || article.quiz.length !== 5) {
    notify('خطأ', 'يجب أن يحتوي الاختبار على 5 أسئلة.');
    return;
  }

  showQuestion({
    title: article.title,
    questions: article.quiz,
    onDone: score => {
      if (v.library.completed.includes(id)) return;

      v.library.completed.push(id);

      const xp = score;
      const coins = Math.floor(score * 3 / 5);

      if (score > 0) {
        reward(xp, coins);
      }

      saveV5();

      notify(
        'انتهى الاختبار',
        score === 0
          ? 'لم تحصل على إجابات صحيحة، لذلك لا توجد مكافأة.'
          : `أجبت إجابة صحيحة عن ${score} من 5. مكافأتك: ${xp} نقاط خبرة و${coins} عملات.`
      );

      render();
    }
  });
};
