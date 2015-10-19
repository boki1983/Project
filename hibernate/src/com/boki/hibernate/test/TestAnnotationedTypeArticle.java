package com.boki.hibernate.test;

import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.bean.Article;
import com.boki.hibernate.bean.Type;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestAnnotationedTypeArticle {

	public static void main(String[] args) throws Exception {

		Type type = new Type();
		type.setName("學術論文");

		Article article = new Article();
		article.setType(type);
		article.setName("明清時代古典小說研究");
		article.setContent("  明清時代是中國古典小說的高峰時期，湧現了一批經典的小說。四大名著便是產於這個時期。");

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		session.persist(article);

		List<Article> list = session.createQuery(
				" select a from Article a where a.name like '%明清%'  ").list();

		for (Article a : list) {
			System.out.println("類別：" + a.getType().getName());
			System.out.println("標題：" + a.getName());
			System.out.println("概要：" + substring(a.getContent(), 50));
			System.out.println("----------------------");
		}

		session.getTransaction().commit();
		session.close();

	}

	private static String substring(String content, int i) {
		return content == null ? "" : content.length() < i + 1 ? content
				: content.substring(0, i);
	}
}
