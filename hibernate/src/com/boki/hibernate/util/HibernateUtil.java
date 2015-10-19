package com.boki.hibernate.util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;

public class HibernateUtil {
	// ��@���A��sessionFactory
	private static final SessionFactory sessionFactory;

    // �ϥ�static�{���X�϶��A���O���J�ɪ�l��Hibernate
	static {
		try {
			// �q hibernate.cfg.xml �����J�]�w
			sessionFactory = new AnnotationConfiguration().configure(
					"hibernate.cfg.xml").buildSessionFactory();
		} catch (Throwable ex) {
			System.err.println("Initial SessionFactory creation failed." + ex);
			throw new ExceptionInInitializerError(ex);
		}
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}

}