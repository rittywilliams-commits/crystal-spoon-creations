
-- Lock down SECURITY DEFINER helpers
revoke execute on function public.has_staff_role(uuid) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;

-- Replace permissive INSERT policies with basic validity checks
drop policy if exists "Anyone can submit lead" on public.leads;
create policy "Anyone can submit lead" on public.leads for insert
  with check (email is not null and length(email) > 3 and company_or_name is not null);

drop policy if exists "Anyone can subscribe" on public.newsletter_subscribers;
create policy "Anyone can subscribe" on public.newsletter_subscribers for insert
  with check (email is not null and length(email) > 3 and position('@' in email) > 1);
