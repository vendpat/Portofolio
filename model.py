import pymysql
from config import Config


class Database:

    def __init__(self):

        self.conn = pymysql.connect(
            host=Config.TIDB_HOST,
            port=int(Config.TIDB_PORT),
            user=Config.TIDB_USER,
            password=Config.TIDB_PASSWORD,
            database=Config.TIDB_DATABASE,

            # WAJIB untuk TiDB Cloud
            ssl={
                "ssl": {}
            },

            cursorclass=pymysql.cursors.DictCursor,
            autocommit=True
        )

    def execute_query(self, query, params=None, fetch=False):

        with self.conn.cursor() as cursor:

            cursor.execute(query, params)

            if fetch:
                return cursor.fetchall()

            return None

    def close(self):
        self.conn.close()