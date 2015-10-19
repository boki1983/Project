package com.boki.hibernate.test;

import java.util.List;

import org.hibernate.Session;

import com.boki.hibernate.bean.Sailor;
import com.boki.hibernate.bean.Ship;
import com.boki.hibernate.util.HibernateSessionFactory;

public class TestAnnotationedShipSailor {

	@SuppressWarnings("all")
	public static void main(String[] args) throws Exception {

		Ship ship = new Ship();
		ship.setName("���Z���J");

		Sailor captain = new Sailor();
		captain.setName("�v�K��");
		captain.setShip(ship);

		Sailor sailor = new Sailor();
		sailor.setName("�ǧJ");
		sailor.setShip(ship);

		ship.setCaptain(captain);
		ship.getSailors().add(captain);
		ship.getSailors().add(sailor);

		Session session = HibernateSessionFactory.getSession();
		session.beginTransaction();

		session.persist(ship);

		List<Sailor> list = session.createQuery(
				" select s from Sailor s where s.ship.name = :name ")
				.setParameter("name", "���Z���J").list();

		for (Sailor s : list) {
			System.out.println("����G" + s.getName());
			System.out.println("ĥ��G" + s.getShip().getName());
			System.out.println("����G" + s.getShip().getCaptain().getName());
			System.out.println("-----------------");
		}

		session.getTransaction().commit();
		session.close();
	}

}
