package com.boki.hibernate.test;

import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.bean.Article;
import com.boki.hibernate.bean.Type;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestAnnotationedTypeArticle {

	public static void main(String[] args) throws Exception {

		Type type = new Type();
		type.setName("�ǳN�פ�");

		Article article = new Article();
		article.setType(type);
		article.setName("���M�ɥN�j��p����s");
		article.setContent("  ���M�ɥN�O����j��p�������p�ɴ��A��{�F�@��g�媺�p���C�|�j�W�۫K�O����o�Ӯɴ��C");

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		session.persist(article);

		List<Article> list = session.createQuery(
				" select a from Article a where a.name like '%���M%'  ").list();

		for (Article a : list) {
			System.out.println("���O�G" + a.getType().getName());
			System.out.println("���D�G" + a.getName());
			System.out.println("���n�G" + substring(a.getContent(), 50));
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
