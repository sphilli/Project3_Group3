import sqlalchemy
from sqlalchemy import create_engine, func, inspect, text
import pandas as pd

class SQLHelper():

    def __init__(self):
        self.engine = create_engine("sqlite:///Resources/chipotle.sqlite")

    def getMapData(self, state):
        # allow the user to select ALL or a specific state
        if state == "All":
            where_clause = "1=1"
        else:
            where_clause = f"state = '{state}'"

        # USE RAW SQL
        query = f"""
                SELECT
                    *
                FROM
                    chipotle
                WHERE
                    {where_clause};
        """

        df_map = pd.read_sql(text(query), con=self.engine)
        data_map = df_map.to_dict(orient="records")

        return(data_map)

    def getBarData(self, state):
        # allow the user to select ALL or a specific state
        if state == "All":
            where_clause = "1=1"
        else:
            where_clause = f"state = '{state}'"

        query = f"""
            SELECT
                location,
                state,
                location || ', ' || state as loc_display,
                count(*) as num_chipotles
            FROM
                chipotle
            WHERE
                {where_clause}
            GROUP BY
                location,
                state
            ORDER BY
                num_chipotles desc
            LIMIT 10;
        """

        df_bar = pd.read_sql(text(query), con=self.engine)
        data_bar = df_bar.to_dict(orient="records")

        return(data_bar)