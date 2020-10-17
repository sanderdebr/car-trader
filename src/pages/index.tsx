import { getMakes, Make } from "../database/getMakes";
import { GetServerSideProps } from "next";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import { Paper, Grid, makeStyles, Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select, { SelectProps } from "@material-ui/core/Select";
import router, { useRouter } from "next/router";
import useSWR from "swr";
import { Model, getModels } from "../database/getModels";
import { getAsString } from "../getAsString";

export interface HomeProps {
  makes: Make[];
  models: Model[];
}

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "auto",
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Home({ makes, models }: HomeProps) {
  const classes = useStyles();
  const { query } = useRouter();

  const initialValues = {
    make: getAsString(query.make) || "all",
    model: getAsString(query.model) || "all",
    minPrice: getAsString(query.minPrice) || "all",
    maxPrice: getAsString(query.maxPrice) || "all",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: "/",
            query: { ...values, page: 1 },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {({ values }) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-make">Make</InputLabel>
                  <Field
                    name="make"
                    as={Select}
                    labelId="search-make"
                    label="Make"
                  >
                    <MenuItem value="all">
                      <em>All Makes</em>
                    </MenuItem>
                    {makes.map((make) => (
                      <MenuItem key={make.make} value={make.make}>
                        {`${make.make} (${make.count})`}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ModelSelect make={values.make} name="model" models={models} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-min-price">Min Price</InputLabel>
                  <Field
                    name="minPrice"
                    as={Select}
                    labelId="search-min-price"
                    label="Min Price"
                  >
                    <MenuItem value="all">
                      <em>No min</em>
                    </MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-max-price">Max Price</InputLabel>
                  <Field
                    name="maxPrice"
                    as={Select}
                    labelId="search-max-price"
                    label="Max Price"
                  >
                    <MenuItem value="all">
                      <em>No max</em>
                    </MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

export interface ModelSelectProps extends SelectProps {
  name: string;
  models: Model[];
  make: string;
}

export function ModelSelect({ models, make, ...props }: ModelSelectProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { data } = useSWR<Model[]>("/api/models?make=" + make, {
    onSuccess: (newValues) => {
      if (!newValues.map((a) => a.model).includes(field.value)) {
        setFieldValue("model", "all");
      }
    },
  });
  const newModels = data || models;

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="search-model">Model</InputLabel>
      <Select
        name="model"
        labelId="search-model"
        label="Model"
        {...field}
        {...props}
      >
        <MenuItem value="all">
          <em>All Models</em>
        </MenuItem>
        {newModels.map((model) => (
          <MenuItem
            key={model.model}
            value={model.model}
          >{`${model.model} (${model.count})`}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make);

  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);

  return { props: { makes, models } };
};
