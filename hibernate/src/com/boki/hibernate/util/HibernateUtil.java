package com.boki.hibernate.util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;

public class HibernateUtil {
	// 單一狀態的sessionFactory
	private static final SessionFactory sessionFactory;

    // 使用static程式碼區塊，類別載入時初始化Hibernate
	static {
		try {
			// 從 hibernate.cfg.xml 中載入設定
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