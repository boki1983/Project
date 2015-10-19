package com.boki.batch;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.mysql.jdbc.Driver;

public class BatchTest {

	public static void main(String[] args) throws SQLException {

		new Driver();

		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;

		try {
			conn = DriverManager.getConnection(
					"jdbc:mysql://localhost:3306/databaseWeb?characterEncoding=UTF-8", 
					"root",  "Ie@119653");

			stmt = conn.createStatement();

			for (int i = 0; i < 5; i++) {

				// ���㪺 SQL �ԭz
				String sql = "insert into tb_person "
						+ " ( name, english_name, age, "
						+ " sex, birthday, description) " + " values ('Name "
						+ i + "', 'English Name " + i + "', "
						+ " '17', 'man', current_date(), '') ";

				// �z�LaddBatch�W�[�@��SQL�ԭz     �妸�W�[
				stmt.addBatch(sql);
			}

			// �妸���� �N�C�ySQL���檺���G��´�� int[] �}�C
			int[] result = stmt.executeBatch();

			// ��X
			System.out.print("�v�T����Ƥ��O���G");
			for (int i = 0; i < result.length; i++) {
				System.out.print(result[i] + ", ");
			}

		} finally {
			if (rs != null)
				rs.close();

			if (stmt != null)
				stmt.close();

			if (conn != null)
				conn.close();
		}
	}
}